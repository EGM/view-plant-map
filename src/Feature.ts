export interface Feature {
  geometry: FeatureGeometry;
  properties: Properties;
  id: string;
}

interface FeatureGeometry {
  coordinates?: Array<Array<number[]>>;
  geometries?: GeometryElement[];
}

interface GeometryElement {
  coordinates: Array<Array<number[] | number>>;
}

interface Properties {
  name: string;
  description?: DescriptionClass | string;
}

interface DescriptionClass {
  "@type": string;
  value: string;
}
