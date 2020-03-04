import { Injectable } from '@nestjs/common';

import { metadata } from './db/metadata.data';

@Injectable()
export class MetadataService {

  latestVersion = 3;
  firstVersion = 1;

  getMetadata(version: number, type: string) {

    if (version === this.latestVersion) {
      return { version: this.latestVersion };
    } else {
      const currentVersion = this.getCurrentVersion(version);

      return metadata.find(data => data.version === currentVersion && data.type === type);
    }

  }

  private getCurrentVersion(version: number) {
    return version < this.latestVersion ? version + this.firstVersion : this.latestVersion;
  }

}
