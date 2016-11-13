import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PropertyItem } from './propertyItem';

@Injectable()
export class RetrievalService {

  private urlResources = 'v1/online-services/resources/';
  private urlTransaction = 'v1/online-services/transactions/';
  private urlCertificate = 'v1/online-services/certificates/';
  private urlDocument = 'v1/online-services/documents/';

  constructor(private http: Http) {

  }

  // region Public methods

  public getItem(itemType: string, itemUID: string, itemHash: string): Promise<PropertyItem[]> {
    return this.getPropertyItems(this.urlCertificate, itemUID);
  }

  public getCertificate(certificateUID: string): Promise<PropertyItem[]> {
    return this.getPropertyItems(this.urlCertificate, certificateUID);
  }

  public getTransaction(transactionUID:string): Promise<PropertyItem[]> {
    return this.getPropertyItems(this.urlTransaction, transactionUID);
  }

  public getResources(resourceUID: string): Promise<PropertyItem[]> {
    return this.getPropertyItems(this.urlResources, resourceUID);
  }

  public getDocument(documentUID:string): Promise<PropertyItem[]> {
    return this.getPropertyItems(this.urlDocument, documentUID);
  }

  // endregion Public methods

  // region Public methods

  private getPropertyItems(endpoint: string, uid:string): Promise<PropertyItem[]> {
    const servicesServer = 'http://registropublico.tlaxcala.gob.mx/services/';

    let url = servicesServer + endpoint + uid;  // + '?hash=12345';

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as PropertyItem[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json().data || error.message);
  }

  // endregion Public methods

}
