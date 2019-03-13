import React from "react";
import DataListBulkActions from "./DataListBulkActions";

const DataListHeader = ({
  onSaveAll,
  onDeleteAll,
  onCancelAll,
  onAddNew,
  listEditMode,
  title,
  showSaveAllButton,
  showCancelAllButton,
  showDeleteAllButton,
  showAddNewButton
}) => {
  return (
    <div className="list__header">
      <div className="list__title">{title}</div>
      <DataListBulkActions
        onSaveAll={onSaveAll}
        onDeleteAll={onDeleteAll}
        onCancelAll={onCancelAll}
        onAddNew={onAddNew}
        listEditMode={listEditMode}
        showSaveAllButton={showSaveAllButton}
        showCancelAllButton={showCancelAllButton}
        showDeleteAllButton={showDeleteAllButton}
        showAddNewButton={showAddNewButton}
      />
    </div>
  );
};

export default DataListHeader;
