import { PageProps } from "$fresh/server.ts";

export default function Customers({ key, data }: PageProps) {
  const { name, lastName, company, email, phone } = data;

  return (
    <li>
      <div>
        <p>{name} {lastName}</p>
        <p>{company}</p>
        <p>{email}</p>
        <p>Phone: {phone}</p>
      </div>
    </li>
  );
}
