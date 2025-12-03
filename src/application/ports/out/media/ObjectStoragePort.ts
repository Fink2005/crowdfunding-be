export interface ObjectStoragePort {
  getSignedUrl(fileName: string, fileType: string): Promise<string>;
}
