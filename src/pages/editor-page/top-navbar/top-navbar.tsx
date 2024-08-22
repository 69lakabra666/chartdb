import React, { useCallback, useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/menubar/menubar';
import { Label } from '@/components/label/label';
import { Button } from '@/components/button/button';
import { Check, Pencil, Save } from 'lucide-react';
import { Input } from '@/components/input/input';
import { useChartDB } from '@/hooks/use-chartdb';
import { useClickAway, useKeyPressEvent } from 'react-use';
import ChartDBLogo from '@/assets/logo.png';
import { useDialog } from '@/hooks/use-dialog';
import { Badge } from '@/components/badge/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/tooltip/tooltip';
import { useExportImage } from '@/hooks/use-export-image';
import {
    databaseSecondaryLogoMap,
    databaseTypeToLabelMap,
} from '@/lib/databases';
import { DatabaseType } from '@/lib/domain/database-type';

export interface TopNavbarProps {}

export const TopNavbar: React.FC<TopNavbarProps> = () => {
    const { diagramName, updateDiagramName, currentDiagram } = useChartDB();
    const {
        openCreateDiagramDialog,
        openOpenDiagramDialog,
        openExportSQLDialog,
    } = useDialog();
    const [editMode, setEditMode] = useState(false);
    const { exportImage } = useExportImage();
    const [editedDiagramName, setEditedDiagramName] =
        React.useState(diagramName);
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        setEditedDiagramName(diagramName);
    }, [diagramName]);

    const editDiagramName = useCallback(() => {
        if (!editMode) return;
        if (editedDiagramName.trim()) {
            updateDiagramName(editedDiagramName.trim());
        }

        setEditMode(false);
    }, [editedDiagramName, updateDiagramName, editMode]);

    useClickAway(inputRef, editDiagramName);
    useKeyPressEvent('Enter', editDiagramName);

    const createNewDiagram = () => {
        openCreateDiagramDialog();
    };

    const openDiagram = () => {
        openOpenDiagramDialog();
    };

    const enterEditMode = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        setEditMode(true);
    };

    const exportPNG = useCallback(() => {
        exportImage('png');
    }, [exportImage]);

    const exportSVG = useCallback(() => {
        exportImage('svg');
    }, [exportImage]);

    const exportJPG = useCallback(() => {
        exportImage('jpeg');
    }, [exportImage]);

    const openChartDBIO = useCallback(() => {
        window.open('https://chartdb.io', '_blank');
    }, []);

    const openJoinSlack = useCallback(() => {
        window.open(
            'https://join.slack.com/t/chartdb/shared_invite/zt-2ourrlh5e-mKIHCRML3_~m_gHjD5EcUg',
            '_blank'
        );
    }, []);

    return (
        <nav className="flex flex-row items-center justify-between px-4 h-12 border-b">
            <div className="flex flex-1 justify-start gap-x-3">
                <div className="flex font-primary items-center">
                    <a
                        href="https://chartdb.io"
                        target="_blank"
                        className="cursor-pointer"
                        rel="noreferrer"
                    >
                        <img
                            src={ChartDBLogo}
                            alt="chartDB"
                            className="h-4 max-w-fit"
                        />
                    </a>
                </div>
                <div>
                    <Menubar className="border-none shadow-none">
                        <MenubarMenu>
                            <MenubarTrigger>File</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem onClick={createNewDiagram}>
                                    New
                                    <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem onClick={openDiagram}>
                                    Open
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        Export SQL
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem
                                            onClick={() =>
                                                openExportSQLDialog({
                                                    targetDatabaseType:
                                                        DatabaseType.GENERIC,
                                                })
                                            }
                                        >
                                            {databaseTypeToLabelMap['generic']}
                                        </MenubarItem>
                                        <MenubarItem
                                            onClick={() =>
                                                openExportSQLDialog({
                                                    targetDatabaseType:
                                                        DatabaseType.POSTGRESQL,
                                                })
                                            }
                                        >
                                            {
                                                databaseTypeToLabelMap[
                                                    'postgresql'
                                                ]
                                            }
                                        </MenubarItem>
                                        <MenubarItem
                                            onClick={() =>
                                                openExportSQLDialog({
                                                    targetDatabaseType:
                                                        DatabaseType.MYSQL,
                                                })
                                            }
                                        >
                                            {databaseTypeToLabelMap['mysql']}
                                        </MenubarItem>
                                        <MenubarItem
                                            onClick={() =>
                                                openExportSQLDialog({
                                                    targetDatabaseType:
                                                        DatabaseType.SQL_SERVER,
                                                })
                                            }
                                        >
                                            {
                                                databaseTypeToLabelMap[
                                                    'sql_server'
                                                ]
                                            }
                                        </MenubarItem>
                                        <MenubarItem
                                            onClick={() =>
                                                openExportSQLDialog({
                                                    targetDatabaseType:
                                                        DatabaseType.MARIADB,
                                                })
                                            }
                                        >
                                            {databaseTypeToLabelMap['mariadb']}
                                        </MenubarItem>
                                        <MenubarItem
                                            onClick={() =>
                                                openExportSQLDialog({
                                                    targetDatabaseType:
                                                        DatabaseType.SQLITE,
                                                })
                                            }
                                        >
                                            {databaseTypeToLabelMap['sqlite']}
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        Export as
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={exportPNG}>
                                            PNG
                                        </MenubarItem>
                                        <MenubarItem onClick={exportJPG}>
                                            JPG
                                        </MenubarItem>
                                        <MenubarItem onClick={exportSVG}>
                                            SVG
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                                <MenubarItem>Exit</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Edit</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Clear</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Help</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem onClick={openChartDBIO}>
                                    Visit ChartDB
                                </MenubarItem>
                                <MenubarItem onClick={openJoinSlack}>
                                    Join us on Slack
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
            <div className="flex flex-row flex-1 justify-center items-center group gap-2">
                <Tooltip>
                    <TooltipTrigger>
                        <img
                            src={
                                databaseSecondaryLogoMap[
                                    currentDiagram.databaseType
                                ]
                            }
                            className="h-5 max-w-fit"
                            alt="database"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        {databaseTypeToLabelMap[currentDiagram.databaseType]}
                    </TooltipContent>
                </Tooltip>
                <div className="flex">
                    <Label>Diagrams/</Label>
                </div>
                <div className="flex flex-row items-center gap-1">
                    {editMode ? (
                        <>
                            <Input
                                ref={inputRef}
                                autoFocus
                                type="text"
                                placeholder={diagramName}
                                value={editedDiagramName}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) =>
                                    setEditedDiagramName(e.target.value)
                                }
                                className="h-7 focus-visible:ring-0"
                            />
                            <Button
                                variant="ghost"
                                className="hover:bg-primary-foreground p-2 w-7 h-7 text-slate-500 hover:text-slate-700 hidden group-hover:flex"
                                onClick={editDiagramName}
                            >
                                <Check />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Label>{diagramName}</Label>
                            <Button
                                variant="ghost"
                                className="hover:bg-primary-foreground p-2 w-7 h-7 text-slate-500 hover:text-slate-700 hidden group-hover:flex"
                                onClick={enterEditMode}
                            >
                                <Pencil />
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="hidden flex-1 justify-end sm:flex">
                <Tooltip>
                    <TooltipTrigger>
                        <Badge variant="secondary" className="flex gap-1">
                            <Save className="h-4" />
                            Last saved
                            <TimeAgo datetime={currentDiagram.updatedAt} />
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        {currentDiagram.updatedAt.toLocaleString()}
                    </TooltipContent>
                </Tooltip>
            </div>
        </nav>
    );
};
