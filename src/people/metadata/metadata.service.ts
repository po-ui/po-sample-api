import { Injectable } from '@nestjs/common';

import { metadata } from './db/metadata.data';

@Injectable()
export class MetadataService {
  latestVersion = 3;
  firstVersion = 1;

  getMetadata(version: number, type: string) {
    const currentVersion = this.getCurrentVersion(version);

    return metadata.find(data => data.version === currentVersion && data.type === type);
  }

  private getCurrentVersion(version: number) {
    return version < this.latestVersion ? version + this.firstVersion : this.latestVersion;
  }
}
