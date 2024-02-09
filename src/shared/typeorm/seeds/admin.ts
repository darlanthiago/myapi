import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { dataSource } from "@shared/typeorm";

async function create() {
  const connection = await dataSource.initialize();

  const roleId = uuidv4();

  await connection.query(`
    INSERT INTO roles (id, name)
    VALUES ('${roleId}', 'T.I')
  `);

  const userId = uuidv4();
  const password = await hash("1234", 10);

  await connection.query(`
    INSERT INTO users (id, name, email, password, is_admin, created_at, role_id)
    VALUES ('${userId}', 'Admin', 'admin@admin.com', '${password}', true, now(), '${roleId}')
  `);

  await connection.destroy();
}

create().then(() => console.log("User admin successfully created"));
