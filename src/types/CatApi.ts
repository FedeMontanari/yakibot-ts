export interface CatApi {
  id: string;
  width: string;
  height: string;
  url: string;
  breeds: [
    {
      weight: {
        imperial: string;
        metric: string;
      };
      id: string;
      name: string;
      temperament: string;
      origin: string;
      country_codes: string;
      country_code: string;
      life_span: string;
      wikipedia_url: string;
      description: string;
      indoor: number;
      lap: number;
      alt_names: string;
      adaptability: number;
      affection_level: number;
      child_friendly: number;
      dog_friendly: number;
      energy_level: number;
      grooming: number;
      health_issues: number;
      intelligence: number;
      social_needs: number;
      stranger_friendly: number;
      vocalisation: number;
      hairless: number;
      experimental: number;
      natural: number;
      rare: number;
      rex: number;
      supressed_tail: number;
      short_legs: number;
      hypoallergenic: number;
      reference_image_id: string;
    }
  ];
}
