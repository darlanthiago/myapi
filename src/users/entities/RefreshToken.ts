import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "refresh_tokens" })
export class RefreshToken {
  @PrimaryColumn()
  id?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  token: string;

  @Column()
  user_id: string;

  @Column()
  valid: boolean;

  @Column()
  expires: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
