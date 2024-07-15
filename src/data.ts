export interface StockDetails {
    ID: number;
    CompanyName: string;
    Sector: string;
    Net: number;
    Last: number;
    ChangeInValue: number;
    ChangeInPercent: number;
    High: number;
    Low: number;
    Rating: string;
    Volume: number;
}


export let ListData: { id: string, text: string}[] = [
    { id: '1', text: 'All Sectors' },
    { id: '2', text: 'Technology' },
    { id: '3', text: 'Healthcare' },
    { id: '4', text: 'Finance' },
    { id: '5', text: 'Retail' },
    { id: '6', text: 'Manufacturing' },
    { id: '7', text: 'Energy' },
    { id: '8', text: 'Consumer' },
    { id: '9', text: 'Goods' },
    { id: '10', text: 'Telecommunications' },
    { id: '11', text: 'Transportation' },
    { id: '12', text: 'Utilities' },
  ];