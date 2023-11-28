import { Collapse, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi"
import { useNavigate, useParams } from "react-router"
import { PermissionQueries } from "../../API/Permission/PermissionQueries";



const EditRole = ()=>{
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {roleId}  =  useParams();

    const {data: roleDetails, isLoading } = PermissionQueries.GetContentsByRoleIdQuery(roleId!)
    return(
        <>
        <div className="mx-20 mt-10 max-md:mx-5 max-sm:mx-3">
            <div className="flex text-center gap-2 !my-[20px]">
              <BiArrowBack
                onClick={() => navigate(-1)}
                className={`text-[40px] text-blue-100 mt-2 cursor-pointer`}
              />
              <h1 className={`text-[40px] text-blue-100  max-sm:text-[20px] `}>
                {t("permission.edit")}
              </h1>
            </div>
            <Paper sx={{ py: 1, px: 4 }} elevation={5}>
              {/* <form onSubmit={handleSubmit(submitHandler)}> */}

                <Collapse in={true}>
                  <Grid container sx={{ marginInlineStart: 3 }}>
                    {roleDetails?.contents?.map((data, idx) => {
                      return (
                        <Grid item key={data.id} xs={12} md={6} lg={4} xl={3}>
                          {/* <CheckContent
                            content={data}
                            control={control}
                            register={register}
                            index={idx}
                            setValue={setValue}
                            watch={watch}
                          /> */}
                        </Grid>
                      );
                    })}
                  </Grid>
                </Collapse>
                {/* <div className="flex justify-center">
                  <SubmitButton
                    sx={{ width: "min(10rem,100%)", marginTop: "60px" }}
                    isSubmitting={isPending}
                  />
                </div>
              </form> */}
            </Paper>
        </div>
        </>
    )

}
export default EditRole