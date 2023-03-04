return (
  <div>
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Product</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowEditModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 ">
              <form className=" px-2 pt-6 pb-8 w-full">
                <div className="flex flex-row px-8 w-full">
                  <div className="flex flex-col  px-8 w-full">
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        English Product Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-80 py-2 px-1 text-black"
                        defaultValue={product?.name?.english}
                        onChange={(e) => {
                          setEnglishProductName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Amharic Product Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        defaultValue={product?.name?.amharic}
                        onChange={(e) => {
                          setAmharicProductName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        English Description
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        defaultValue={product?.description?.english}
                        onChange={(e) => {
                          setEnglishDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Amharic Description
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        defaultValue={product?.description?.amharic}
                        onChange={(e) => {
                          setAmharicDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Brand
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-80 py-2 px-1 text-black"
                        defaultValue={product?.brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Rating
                      </label>
                      <input
                        type="number"
                        className="shadow appearance-none  rounded w-full py-2 px-1 text-black"
                        defaultValue={product?.rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Discount
                      </label>
                      <input
                        type="number"
                        className="shadow appearance-none  rounded w-full py-2 px-1 text-black"
                        defaultValue={product?.discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col px-8 w-full">
                    {/*   <div>
                        <label
                          for="countries"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Select category
                        </label>
                        <select
                          required
                          id="countries"
                          defaultValue={product?.category_id}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            categorySelectHandler(e);
                          }}
                        >
                          <option selected>Select Category English Name</option>
                          {CategoryData?.data?.data?.data.map((category) => (
                            <>
                              <option key={category?.id} value={category?.id}>
                                {category?.name?.english}
                              </option>
                            </>
                          ))}
                        </select>
                      </div> */}
                    {/*  <div>
                        <label
                          for="countries"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Select Product Unit
                        </label>
                        <select
                          required
                          id="countries"
                          defaultValue={product?.product_unit_id}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            unitSelectHandler(e);
                          }}
                        >
                          <option selected>
                            Select Product Unit English Name
                          </option>
                          {UnitData?.data?.data?.data.map((unit) => (
                            <>
                              <option key={unit?.id} value={unit?.id}>
                                {unit?.name?.english}
                              </option>
                            </>
                          ))}
                        </select>
                      </div> */}
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        className="shadow appearance-none border rounded  w-80 py-2 px-1 text-black"
                        defaultValue={product?.price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Amharic Usage
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        defaultValue={product?.usage?.amharic}
                        onChange={(e) => {
                          setAmharicUsage(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        English Usage
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        defaultValue={product?.usage?.english}
                        onChange={(e) => {
                          setEnglishUsage(e.target.value);
                        }}
                      />
                    </div>

                    {/* <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Product Image file
                      </label>
                      <input
                        required
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        onChange={(e) => {
                          setProductPhoto(e.target.files[0]);
                        }}
                        type="file"
                      />
                      <p
                        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </p> */}
                    <label className="block text-black text-sm font-base mb-1">
                      Image
                    </label>
                    <ImageList
                      className="ml-4  mr-6  border-2 shadow-lg rounded"
                      sx={{ width: 550, height: 250 }}
                      cols={3}
                      rowHeight={200}
                    >
                      {product?.product_images?.map((item) => {
                        return (
                          <img
                            key={item}
                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="image"
                            loading="lazy"
                          />
                        );
                      })}
                    </ImageList>
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
              <button
                disabled={editProductMutation.isLoading}
                className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  editProductHandler();
                  setEditProId(1);
                }}
              >
                {editProductMutation.isLoading ? "saving.." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  </div>
);
