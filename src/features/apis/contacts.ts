function getContacts({
  userId,
  query,
}: {
  userId: number;
  query?: string | null;
}) {
  let search = "";
  if (query != null) {
    search = `&name_like=${query}`;
  }

  return fetch(`http://localhost:3001/contacts?userId=${userId}${search}`, {
    method: "GET",
  });
}

function updateContact({
  contactId,
  name,
  tel,
  email,
}: {
  contactId: number;
  name: string;
  tel: string;
  email: string;
}) {
  return fetch(`http://localhost:3001/contacts/${contactId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, tel, email }),
  });
}

function addContact({
  userId,
  name,
  tel,
  email,
}: {
  userId: number;
  name: string;
  tel: string;
  email: string;
}) {
  return fetch(`http://localhost:3001/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name, tel, email }),
  });
}

function deleteContact(contactId: number) {
  return fetch(`http://localhost:3001/contacts/${contactId}`, {
    method: "DELETE",
  });
}

export { getContacts, updateContact, addContact, deleteContact };
