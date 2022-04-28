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

export { getContacts, editContact, deleteContact };
