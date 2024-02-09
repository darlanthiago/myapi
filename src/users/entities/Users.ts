import { Role } from "@roles/entities/Role";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn()
  id?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  is_admin: boolean;

  @ManyToOne(() => Role, { cascade: true })
  role: Role;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
