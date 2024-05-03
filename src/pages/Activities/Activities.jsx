import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function Activities(){
    const {admin} = useContext(AdminContext);
        return(
            <>
            {admin && <p>Nesto dodatno za admina</p>}
            <p>Aktivnosti</p>
          </>
    )
}

export default Activities;