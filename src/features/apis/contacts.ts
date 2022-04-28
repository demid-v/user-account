function getContacts(userId: number) {
  return fetch(`http://localhost:3001/contacts?userId=${userId}`, {
    method: "GET",
  });
}

function editContact({
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

function deleteContact(contactId: number) {
  return fetch(`http://localhost:3001/contacts/${contactId}`, {
    method: "DELETE",
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

function searchContacts({ userId, query }: { userId: number; query: string }) {
  return fetch(
    `http://localhost:3001/contacts?userId=${userId}&name_like=${query}`,
    {
      method: "GET",
    }
  );
}

export { getContacts, editContact, deleteContact, addContact, searchContacts };
