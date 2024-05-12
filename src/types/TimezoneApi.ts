export type TimezoneApi = {
    status: "OK" | "FAILED"
    message: string
    countryCode: string
    countryName: string
    regionName: string
    cityName: string
    abbreviation: string
    formatted: string
}