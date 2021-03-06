import { Injectable } from '@angular/core';

import { DataOperation } from '../shared/services/data.operation';
import { DataService } from '../shared/services/data.service';
import { PropertyItem } from '../shared/services/propertyItem';
import 'rxjs/Rx';

export enum DocumentItemType {
  empty = 0,
  resource = 1,
  transaction = 2,
  certificate = 4,
  document = 8
}

@Injectable()
export class SearchService {

  constructor(private dataService: DataService) {

  }

  // region Public methods

  public getDocument(documentType: DocumentItemType, uid: string, hashcode: string):
  Promise<PropertyItem[]> {
    let dataOperationUID = this.getOperationName(documentType);
    let dataOperation = DataOperation.parse(dataOperationUID, uid, hashcode);
    return this.dataService.getList<PropertyItem[]>(dataOperation);
  }

  // endregion Public methods

  // region Private methods

  private getOperationName(documentType: DocumentItemType): string {
    switch (documentType) {

      case DocumentItemType.resource:
        return 'getResource';

      case DocumentItemType.transaction:
        return 'getTransaction';

      case DocumentItemType.certificate:
        return 'getCertificate';

      case DocumentItemType.document:
        return 'getDocument';

      default:
        throw 'Invalid document type';
    }

    // endregion Private methods

  }

}
