export type MapType = string[][];

export interface MapState {
    level: number;
    map: MapType | null;
    rotations: number[][];
    passwords: string[]
}