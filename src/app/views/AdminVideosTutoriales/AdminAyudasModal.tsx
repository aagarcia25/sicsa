import ModalForm from "../componentes/ModalForm";
import AdminAyudas from "./AdminAyudas";

const AdminAyudasModal = ({
  IdMenu,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  IdMenu: string;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  return (
    <ModalForm title={modo} handleClose={handleClose}>
      <AdminAyudas
        IdMenu={IdMenu}
        modo={modo}
        tipo={tipo}
        dt={dt}
        handleClose={handleClose}
      />
    </ModalForm>
  );
};

export default AdminAyudasModal;
