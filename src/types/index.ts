export type PlayerEntity = {
  id: string;
  name: string;
  surname: string;
  relation: number;
};
export type PlayerDto = Omit<PlayerEntity, "id">;

export type PlayerAddEntity = {
  id: string;
  relation: number;
};
export type PlayerAddEntityDto = Omit<PlayerAddEntity, "id">;
