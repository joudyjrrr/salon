
import { FC } from "react";
import { Grid } from '@mui/material';
import { RingLoader }
    from "react-spinners";

const Loading: FC<{
    className?: string,
    size?: number
}> = ({ className, size }) => {

    return (
        <>
            <Grid container sx={{ height: '100%' }} justifyContent={'center'} alignContent={'center'}>
                <RingLoader
                    className={className ?? ''}
                    size={size ?? 80}
                    color="blue"
                />
            </Grid>
        </>
    )
}

export default Loading