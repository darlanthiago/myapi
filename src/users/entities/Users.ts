import { Role } from "@roles/entities/Role";
import { Exclude, Expose } from "class-transformer";
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

  @Column()
  avatar?: string;

  @ManyToOne(() => Role, { cascade: true })
  role: Role;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.API_URL}/files/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
