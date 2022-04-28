import plusIcon from "../assets/icons/plus.svg";
import checkIcon from "../assets/icons/check.png";
import cancelIcon from "../assets/icons/cancel.svg";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addContactThunk } from "../features/contacts/contacts";
import { selectLogin } from "../features/login/login";

function AddContact() {
  const [addMode, setAddMode] = useState(false);

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  const { userId } = useAppSelector(selectLogin);

  function turnOnAddMode() {
    setAddMode(true);
  }

  function exitAddMode() {
    setAddMode(false);

    setName("");
    setTel("");
    setEmail("");
  }

  const dispatch = useAppDispatch();

  function addContact() {
    exitAddMode();

    if (userId !== undefined) {
      dispatch(addContactThunk({ userId, name, tel, email }));
    }
  }

  function handleNameChange(event: FormEvent) {
    setName((event.target as HTMLInputElement).value);
  }

  function handleTelChange(event: FormEvent) {
    setTel((event.target as HTMLInputElement).value);
  }

  function handleEmailChange(event: FormEvent) {
    setEmail((event.target as HTMLInputElement).value);
  }

  return (
    <tr>
      <td></td>
      {addMode ? (
        <>
          <td>
            <input type="text" value={name} onChange={handleNameChange} />
          </td>
          <td>
            <input type="text" value={tel} onChange={handleTelChange} />
          </td>
          <td>
            <input type="text" value={email} onChange={handleEmailChange} />
          </td>
        </>
      ) : (
        <>
          <td></td>
          <td></td>
          <td></td>
        </>
      )}
      <td>
        <div className="contacts-table-options">
          {addMode ? (
            <>
              <button title="Подтвердить" onClick={addContact}>
                <img src={checkIcon} alt="" />
              </button>
              <button title="Отменить редактирование" onClick={exitAddMode}>
                <img src={cancelIcon} alt="" />
              </button>
            </>
          ) : (
            <button title="Добавить контакт" onClick={turnOnAddMode}>
              <img src={plusIcon} alt="" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default AddContact;
