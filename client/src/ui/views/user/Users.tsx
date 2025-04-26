import {useState} from "react";
import {ListPage} from "../../components/ListPage.tsx";
import {faUsers} from "@fortawesome/free-solid-svg-icons";

const dummy: Record<string, any>[] = [
  {
    id: 1,
    fullname: "John Doe",
    username: "johndoe",
    role: "admin",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 2,
    fullname: "Jane Doe",
    username: "janedoe",
    role: "user",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 3,
    fullname: "Bob Smith",
    username: "bobsmith",
    role: "user",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 4,
    fullname: "Alice Johnson",
    username: "alicejohnson",
    role: "admin",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 5,
    fullname: "Charlie Brown",
    username: "charliebrown",
    role: "user",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 6,
    fullname: "Eva Green",
    username: "evagreen",
    role: "admin",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 7,
    fullname: "Frank White",
    username: "frankwhite",
    role: "user",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 8,
    fullname: "Grace Red",
    username: "gracered",
    role: "admin",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  }
];

export function Users() {

  const [data, setData] = useState(dummy);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    //   TODO: Handle search logic here
    console.log(query)
  };

  const labels = ["#", "fullname", "username", "role", "Created At"];
  const keys = ["id", "fullname", "username", "role", "createdAt"];

  return (
    <ListPage
      title="User"
      icon={faUsers}
      addRoute="/users/new"
      searchPlaceholder="Search users..."
      entity="users"
      onQueryChange={setQuery}
      onSearch={handleSearch}
      data={data}
      labels={labels}
      keys={keys}
      actionable={true}
    />
  )
}