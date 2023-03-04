const paymentValidationSchema = Yup.object().shape({
  senderName: Yup.string().min(4).required("sender name is required"),
  bank: Yup.string().required("bank  is required"),
  tinNumber: Yup.string().required("tin number is required"),
  amount: Yup.number().required("money amount is required"),
});

<Formik
  initialValues={{
    bank: "",
    senderName: "",
    tinNumber: "",
    amount: featuredAmountData?.data?.data?.data?.featuredAdAmount,
  }}
  validationSchema={paymentValidationSchema}
  onSubmit={onSubmit}
>
  {({ errors, touched, values, setTouched, setFieldValue, handleChange }) => (
    <Form className="flex flex-col items-start space-y-2">
      <p className=" font-medium text-main-color text-center">
        {isAmh
          ? "ለማስተዋወቅ አንድ ንጥል መርጠዋል? እባክዎን ከዚህ በታች ያለውን ቅጽ ይሙሉ።"
          : "Have you selected an item to advertise? Please fill out the form below."}
      </p>
      <div className="w-full flex flex-col items-start space-y-1">
        <p className="text-[13px] font-medium text-main-color">
          {isAmh ? "ባንክ" : "Bank"}
        </p>
        <Select
          isSearchable={false}
          styles={customStyles}
          placeholder="select bank"
          onChange={(selectedOption) => {
            handleChange("bank")(selectedOption._id);
          }}
          getOptionLabel={(categories) => categories.name}
          getOptionValue={(categories) => categories._id}
          className="w-full font-semibold"
          options={banks}
          name="bank"
          isLoading={false}
          noOptionsMessage={() => "bank appears here"}
        />

        {errors.bank && touched.bank ? (
          <p className="text-[13px] font-medium capitalize text-red-500">
            {errors.bank}
          </p>
        ) : null}
      </div>
      {/* sender name */}
      <div className="w-full flex flex-col items-start space-y-1 py-3">
        <div className="flex items-center justify-between w-full">
          <p className="text-[13px] font-medium text-main-color">
            {isAmh ? "የአስገቢ ስም" : "Sender Name"}
          </p>
        </div>

        <Field
          as="input"
          type="text"
          placeholder="sender Name"
          name="senderName"
          className={`rounded-[4px] font-medium w-full bg-transparent h-[42px] focus:outline-none focus:ring-0   text-dark-gray 
                 ${
                   currentMode !== "Dark"
                     ? "border "
                     : "border  border-slate-400 text-gray-200 bg-[#2C3345]"
                 }  ${
            errors.senderName && touched.senderName
              ? "border border-red-600"
              : "border border-gray-300 "
          }`}
        />
        {errors.senderName && touched.senderName ? (
          <p className="text-[13px] font-medium capitalize text-red-500">
            {errors.senderName}
          </p>
        ) : null}
      </div>

      <button
        disabled={featureListingMutation.isLoading}
        type="submit"
        className="p-2 w-full hover:opacity-80 flex items-center 
           justify-center bg-main-bg font-semibold text-white rounded-[4px]"
      >
        {featureListingMutation.isLoading ? (
          <Bars
            height="25"
            width="50"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          "submit"
        )}
      </button>
    </Form>
  )}
</Formik>;
