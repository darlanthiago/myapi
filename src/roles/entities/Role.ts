import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "roles" })
export class Role {
  @PrimaryColumn()
  id?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
