import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import {
  getCategory,
  dltCategory,
  clearErrors,
} from "../../actions/categoryActions";
import { utils, writeFileXLSX } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa6";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { toast, Toaster } from "sonner";
import { esES } from "@mui/x-data-grid";

const CategorysList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  const { loading, error, category } = useSelector((state) => state?.category);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state?.dltCategory
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(getCategory());

    if (error) {
      toast.error("Error al cargar las categorias");
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error("Error al eliminar la categoria");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Categoria eliminada correctamente");
      navigate("/admin/category");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const confirmDeleteCategory = (rowId) => {
    const rowSelect = rows.find((row) => row.id === rowId);
    console.log(rowSelect);

    if (rowSelect) {
      setDeleteId(rowSelect.id);
      handleOpen();
    }
  };

  const deleteCategoryHandler = async () => {
    if (deleteId !== null) {
      await dispatch(dltCategory(deleteId));
    }
    setOpenModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 220, flex: 0.5 },
    { field: "name", headerName: "Nombre", minWidth: 210, flex: 0.5 },
    {
      field: "images",
      headerName: "Imagenes",
      minWidth: 250,
      flex: 0.5,
      renderCell: (params) => (
        <div>
          {params.value && params.value.length > 0 ? (
            params.value.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-8 h-8 mx-1"
              />
            ))
          ) : (
            <img
              src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1701550801/SoftContAgro/nge2uvmygtkzovgywh3w.png"
              alt="Imagen por defecto"
              className="w-8 h-8 mx-1"
            />
          )}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 95,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <button
            className="text-lg"
            onClick={() => confirmDeleteCategory(params.id)}
          >
            <FaTrash className="text-red-600 hover:text-red-800" />
          </button>
        </div>
      ),
    },
  ];

  const rows =
    category?.map((categorie) => ({
      id: categorie?._id,
      name: categorie?.name,
      images: categorie?.images?.map((image) => image?.url),
    })) ?? [];

  const onExportCSV = () => {
    const wb = utils.book_new();

    const sheetData = rows.map((row) => ({
      ID: row.id,
      Nombre: row.name,
      Imágenes: row.images.join(", "),
    }));

    utils.book_append_sheet(
      wb,
      utils.json_to_sheet(sheetData),
      "Datos de Categorias"
    );

    writeFileXLSX(wb, "DatosCategorias.xlsx");
  };

  const onExportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    const loadImages = (images, callback) => {
      const loadedImages = [];
      let loadedCount = 0;

      images.forEach((imageUrl, index) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          loadedImages[index] = img;
          if (loadedCount === images.length) {
            callback(loadedImages);
          }
        };
        img.src = imageUrl;
      });
    };

    autoTable(doc, {
      head: [["ID", "Nombre", "Imágenes"]],
      body: rows.map((row) => [row.id, row.name, row.images.join(", ")]),
      didDrawCell: (data) => {
        if (data.column.index === 2) {
          // Si es la columna de imágenes
          const images = data.cell.raw.split(", "); // Separamos las URLs de las imágenes

          loadImages(images, (loadedImages) => {
            let y = data.cell.y + 2; // Ajustamos la posición vertical
            loadedImages.forEach((img) => {
              doc.addImage(img, data.cell.x + 2, y, 10, 10); // Agregamos la imagen al PDF
              y += 12; // Incrementamos la posición vertical para la siguiente imagen
            });

            // Guardamos el PDF después de agregar todas las imágenes
            if (data.row.index === rows.length - 1) {
              doc.save("DatosCategorias.pdf");
            }
          });
        }
      },
    });
  };

  return (
    <div className="flex mx-w-full">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col items-center w-full p-4">
        <p className="my-5 text-center mt-16 text-2xl">
          <b>Todas las categorías</b>
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full max-w-screen-xl flex flex-col items-center">
            <div className="flex items-center justify-between gap-2 mb-4 mt-4">
              <span className="font-sans mt-2 mb-2">Exportar</span>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-md hover:scale-105 duration-300"
                onClick={onExportCSV}
              >
                <RiFileExcel2Fill className="text-xl hover:scale-105 duration-300" />
              </button>

              <button
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md hover:scale-105 duration-300"
                onClick={onExportPDF}
              >
                <FaRegFilePdf className="text-xl hover:scale-105 duration-300" />
              </button>
            </div>
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              columns={columns}
              rows={rows}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
              autoHeight
              disableRowSelectionOnClick
              disableColumnSelector
              loading={rows?.length === 0}
              components={{
                Toolbar: GridToolbarContainer,
              }}
              componentsProps={{
                toolbar: {
                  buttons: [
                    <GridToolbarColumnsButton key="columns" />,
                    <GridToolbarFilterButton key="filter" />,
                  ],
                },
              }}
            />
          </div>
        )}
      </div>
      <Toaster position="top-right" richColors closeButton />
      <Dialog
        open={openModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Eliminar Categoría</DialogHeader>
        <DialogBody>
          Estas apunto de eliminar esta categoría. ¿Estas seguro?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpenModal(false)}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={deleteCategoryHandler}
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CategorysList;
