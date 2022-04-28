interface Price {
    symbol: string;
    price: number;
    timestamp: number;
}

type ProviderResponse = {
    timestamp: number;
    data: Array<Price>
}