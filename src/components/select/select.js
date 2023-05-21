import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HTTP_STATUS } from "../../constants/httpStatus";
import { globalService } from "../../services/global.service";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import { businessService } from "../../services/business.service";
import { receiveCategoryService } from "../../services/receive-category.service";
import { recruiterService } from "../../services/recruiter.service";

/**
 * Select Component
 * ID: to defined label and select sync each other
 * LABEL: to display in select
 * VALUE: which will be active in select
 * HANDLE: EVENT when event make change
 * SIZE: size of the Select component
 * CALL_TO_API: which is the endpoint will call to request the data to display in select
 */
const CustomSelect = ({
    id,
    label,
    value,
    handleOnChange,
    size,
    callToApi,
    dataStorage,
    customDatas,
}) => {

    const [datas, setDatas] = useState([]);

    useEffect(() => {

        // const localStorageDatas = JSON.parse(localStorage.getItem(dataStorage));

        if(customDatas?.length){
            setDatas(customDatas);
        } else {
            if (callToApi)
            fetchData()
        }

    }, [callToApi])

    /**
     * method FETCH DATA to display in select component
     * data dynamic by callToApi
     */
    const fetchData = async () => {

        try {

            const reqDatas = await globalService.getData(callToApi);
            const { status } = reqDatas;

            /**
             * data request success set data response to display
             * if request fail set data to []
             */
            if (status === HTTP_STATUS.success) {
                const { data } = reqDatas?.data || [];
                data?.length ? setDatas(data) : setDatas([]);
                localStorage.setItem(LOCAL_STORAGE_KEYS.position_data, JSON.stringify(data));
            } else {
                setDatas([]);
            }
        } catch (error) {

            setDatas([]);
            console.log(error);
        }

    };

    return (
        <FormControl fullWidth size={size}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                id={id}
                labelId={id + 'label'}
                label={label}
                value={value}
                onChange={handleOnChange}
            >
                {
                    datas?.length && datas.map((data, index) => {
                        return <MenuItem value={data.id} key={index} >
                            {data?.name ? data?.name : data?.last_name + " " + data?.first_name}
                        </MenuItem>;
                    })
                }
            </Select>
        </FormControl>
    )
}

export default CustomSelect;