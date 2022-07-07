import React, { useEffect, useState } from "react";
import { ActionButton } from "./ActionButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export function CheckListItem({
    id,
    item,
    isChecked,
    ItemRenderer,
    deleteCallback,
    checkCallback
}) {

	const deleteItem = () => {
		deleteCallback(id);
	}

	const toggleCheck = () => {
		checkCallback(id);
	}

    return (
        <div className="flex flex-row w-full items-center">
            <input type="checkbox" style={{marginRight: "1%"}} onChange={toggleCheck}
            checked={isChecked}/>
            <ItemRenderer data={item} id={id} checked={isChecked}/>
            <button className="px-4 py-1" onClick={deleteItem}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    );
}

export function Checklist({
    items,
    ItemRenderer,
    setItems
}) {

    const [checked, setChecked] = useState(items.map(_ => false))

    useEffect(() => {
        setChecked(items.map(_ => false))
    }, [items])

	const selectAllItems = () => {
		setChecked(items.map(_ => true));
	}

	const deleteCheckedItems = () => {
		let nonCheckedItems = [];
		for (const i in checked) {
			if (!checked[i]) {
				nonCheckedItems.push(items[i]);
			}
		}
		setItems(nonCheckedItems)
        //setChecked(nonCheckedItems.map(_ => false))
	}

	const deleteItem = (key) => {
        const newItems = items.filter((_, i) => i !== key)
        setItems(newItems)
        //setChecked(newItems.map(_ => false))
	}

	const toggleItemCheck = (key) => {
        const newChecked = Array.from(checked)
        newChecked[key] = !newChecked[key]
        setChecked(newChecked)
	}
		
    return (
        <div className="w-full bg-white py-2 px-4 rounded-2xl">
            <div className="flex flex-col gap-1 w-full overflow-y-scroll" style={{maxHeight: '15rem', minHeight: '5rem'}}>
            {
                items.map((item, i) =>
                    <CheckListItem
                        key={i} id={i}
                        ItemRenderer={ItemRenderer} item={item} isChecked={checked[i]}
                        deleteCallback={deleteItem} checkCallback={toggleItemCheck}
                    />
                )
            }
            </div>
            <div className="flex flex-row justify-between w-full pt-2">
                <ActionButton
                    disabled={items.length === 0}
                    onClick={selectAllItems}
                    text="Επιλογή Όλων"
                />
                <ActionButton
                    disabled={!checked.some(c => c)}
                    onClick={deleteCheckedItems}
                    text="Διαγραφή Επιλεγμένων"
                />
            </div>
        </div>
    );
}
