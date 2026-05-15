export interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    address: string;
    ai_analysis: string;
    status: string;
    date: string;

    // Construction Data
    goal: string;

    // Realtor Data
    want_to_move: string;
    buy_sell_both: string;
    price: number;
    sqft: number;
    bedrooms: number;
    bathrooms: number;
    budget: number;
    message: string;
}