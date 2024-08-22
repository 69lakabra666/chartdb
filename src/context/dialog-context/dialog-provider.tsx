import React, { useCallback, useState } from 'react';
import { DialogContext, dialogContext } from './dialog-context';
import { CreateDiagramDialog } from '@/dialogs/create-diagram-dialog/create-diagram-dialog';
import { OpenDiagramDialog } from '@/dialogs/open-diagram-dialog/open-diagram-dialog';
import { ExportSQLDialog } from '@/dialogs/export-sql-dialog/export-sql-dialog';
import { DatabaseType } from '@/lib/domain/database-type';

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [openNewDiagramDialog, setOpenNewDiagramDialog] = useState(false);
    const [openOpenDiagramDialog, setOpenOpenDiagramDialog] = useState(false);
    const [openExportSQLDialog, setOpenExportSQLDialog] = useState(false);
    const [openExportSQLDialogParams, setOpenExportSQLDialogParams] = useState<{
        targetDatabaseType: DatabaseType;
    }>({ targetDatabaseType: DatabaseType.GENERIC });

    const openExportSQLDialogHandler: DialogContext['openExportSQLDialog'] =
        useCallback(
            ({ targetDatabaseType }) => {
                setOpenExportSQLDialog(true);
                setOpenExportSQLDialogParams({ targetDatabaseType });
            },
            [setOpenExportSQLDialog]
        );

    return (
        <dialogContext.Provider
            value={{
                openCreateDiagramDialog: () => setOpenNewDiagramDialog(true),
                closeCreateDiagramDialog: () => setOpenNewDiagramDialog(false),
                openOpenDiagramDialog: () => setOpenOpenDiagramDialog(true),
                closeOpenDiagramDialog: () => setOpenOpenDiagramDialog(false),
                openExportSQLDialog: openExportSQLDialogHandler,
                closeExportSQLDialog: () => setOpenExportSQLDialog(false),
            }}
        >
            {children}
            <CreateDiagramDialog dialog={{ open: openNewDiagramDialog }} />
            <OpenDiagramDialog dialog={{ open: openOpenDiagramDialog }} />
            <ExportSQLDialog
                dialog={{ open: openExportSQLDialog }}
                {...openExportSQLDialogParams}
            />
        </dialogContext.Provider>
    );
};
