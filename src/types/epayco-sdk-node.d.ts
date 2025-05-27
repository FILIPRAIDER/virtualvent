declare module "epayco-sdk-node" {
  interface EpaycoOptions {
    apiKey: string;
    privateKey: string;
    lang: string;
    test: boolean;
  }

  interface PsePaymentParams {
    bank: string;
    invoice: string;
    description: string;
    value: string;
    tax: string;
    tax_base: string;
    currency: string;
    type_person: string;
    doc_type: string;
    doc_number: string;
    name: string;
    last_name: string;
    email: string;
    country: string;
    cell_phone: string;
    url_response: string;
    url_confirmation: string;
    method_confirmation: string;
    ip: string;
  }

  interface EpaycoInstance {
    bank: {
      create: (params: PsePaymentParams) => Promise<unknown>;
    };
  }

  function epaycoSDK(options: EpaycoOptions): EpaycoInstance;

  export default epaycoSDK;
}
