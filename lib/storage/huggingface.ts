import "server-only";

export interface StorageObject {
  path: string;
  type: "file" | "directory";
  size: number;
  oid?: string;
  lfs?: {
    oid: string;
    size: number;
    pointerSize: number;
  };
}

export interface ObjectMetadata {
  path: string;
  size: number;
  contentType: string;
  downloadUrl?: string;
  isLfs: boolean;
  etag?: string;
}

class HuggingFaceStorageService {
  private get token(): string {
    const token = process.env.HF_TOKEN;
    if (!token) {
      throw new Error("Server configuration error: HF_TOKEN environment variable is not defined.");
    }
    return token;
  }

  public get repoId(): string {
    return process.env.HF_DATASET_REPO || "Zaki-oracemeng/3dgs-test";
  }

  private get baseApiUrl(): string {
    return `https://huggingface.co/api/datasets/${this.repoId}`;
  }

  private get baseResolveUrl(): string {
    return `https://huggingface.co/datasets/${this.repoId}/resolve/main`;
  }

  /**
   * List objects in the Hugging Face dataset bucket.
   */
  async listObjects(prefix?: string): Promise<StorageObject[]> {
    const url = prefix
      ? `${this.baseApiUrl}/tree/main/${encodeURIComponent(prefix)}`
      : `${this.baseApiUrl}/tree/main`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to list Hugging Face objects: HTTP ${response.status} - ${errorText}`);
    }

    const items = await response.json();
    return items.map((item: { path: string; type: "file" | "directory"; size?: number; oid?: string; lfs?: { oid: string; size: number; pointerSize: number } }) => ({
      path: item.path,
      type: item.type,
      size: item.size || item.lfs?.size || 0,
      oid: item.oid,
      lfs: item.lfs,
    }));
  }

  /**
   * Get metadata and presigned/resolved streaming URL for an object.
   */
  async getObjectMetadata(path: string): Promise<ObjectMetadata> {
    const targetUrl = `${this.baseResolveUrl}/${encodeURI(path)}`;

    const response = await fetch(targetUrl, {
      method: "HEAD",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      redirect: "manual",
    });

    if (response.status === 404) {
      throw new Error(`Object '${path}' not found in Hugging Face bucket.`);
    }

    const redirectLocation = response.headers.get("location");
    const contentLength = response.headers.get("content-length");
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const etag = response.headers.get("etag") || undefined;

    return {
      path,
      size: contentLength ? parseInt(contentLength, 10) : 0,
      contentType,
      downloadUrl: redirectLocation || targetUrl,
      isLfs: Boolean(redirectLocation),
      etag,
    };
  }

  /**
   * Resolves a streaming/download URL safely for client playback/viewer.
   * If the file is tracked by LFS (large video/splat), Hugging Face returns a 302 presigned CloudFront/CDN URL.
   */
  async getDownloadUrl(path: string): Promise<string> {
    const meta = await this.getObjectMetadata(path);
    return meta.downloadUrl || `${this.baseResolveUrl}/${encodeURI(path)}`;
  }

  /**
   * Upload / commit a file to the Hugging Face dataset bucket.
   * Runs server-side only.
   */
  async uploadObject(
    path: string,
    content: Buffer | Uint8Array | string,
    commitMessage = "Upload 3DGS asset"
  ): Promise<{ commitOid?: string; path: string }> {
    const base64Content = Buffer.isBuffer(content)
      ? content.toString("base64")
      : typeof content === "string"
      ? Buffer.from(content).toString("base64")
      : Buffer.from(content).toString("base64");

    const commitUrl = `${this.baseApiUrl}/commit/main`;

    const response = await fetch(commitUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: commitMessage,
        operations: [
          {
            operation: "file",
            path,
            content: base64Content,
            encoding: "base64",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload to Hugging Face: HTTP ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return {
      commitOid: data.commit?.oid,
      path,
    };
  }

  /**
   * Check connection status to Hugging Face bucket.
   */
  async checkConnection(): Promise<{ ok: boolean; repoId: string; error?: string }> {
    try {
      const res = await fetch(`${this.baseApiUrl}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (res.ok) {
        return { ok: true, repoId: this.repoId };
      }
      return { ok: false, repoId: this.repoId, error: `HTTP ${res.status}` };
    } catch (e) {
      return { ok: false, repoId: this.repoId, error: (e as Error).message };
    }
  }
}

export const hfStorage = new HuggingFaceStorageService();
