import React, { useState } from 'react';

const Table = ({
  taskList,
  switchTask,
  handleOnDelete,
  entryList,
  handleOnSelect,
  toDelete,
  badList,
}) => {
  // console.log(toDelete);

  return (
    <>
      <div className="row mt-5">
        <div className="col-md">
          <h3 className="text-center">Entry List</h3>
          <hr />
          {/* <!-- Entry list table  --> */}
          <input
            type="checkbox"
            className="form-check-input mx-4"
            value="allEntry"
            id="all-entry"
            onChange={handleOnSelect}
          />
          <label htmlFor="all-entry">Select All</label>
          <table className="table table-striped table-hover border">
            <tbody id="entryList">
              {entryList.map((item, i) => {
                return (
                  <tr key={item?._id}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input mx-4"
                        value={item?._id}
                        onChange={handleOnSelect}
                        checked={toDelete.includes(item?._id)}
                      />
                      {item.task}
                    </td>
                    <td>{item.hr}hr</td>
                    <td className="text-end">
                      {/* <button
                        onClick={() => handleOnDelete(item._id)}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button> */}
                      <button
                        onClick={() => switchTask(item._id, 'bad')}
                        className="btn btn-success"
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md">
          <h3 className="text-center">Bad List</h3>
          <hr />

          {/* <!-- Bad List table --> */}
          <input
            type="checkbox"
            className="form-check-input mx-4"
            value="allBad"
            id="all-bad"
            onChange={handleOnSelect}
          />
          <label htmlFor="all-bad">Select All</label>
          <table className="table table-striped table-hover border">
            <tbody id="badList">
              {badList.map((item, i) => (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input mx-4"
                      value={item?._id}
                      onChange={handleOnSelect}
                      checked={toDelete.includes(item?._id)}
                    />
                    {item.task}
                  </td>
                  <td>{item.hr}hr</td>
                  <td className="text-end">
                    <button
                      onClick={() => switchTask(item._id, 'entry')}
                      className="btn btn-warning"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    {/* <button
                      onClick={() => handleOnDelete(item.id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="alert alert-success">
            You could have saved ={' '}
            <span id="savedHrsElm">
              {badList.reduce((acc, i) => acc + i.hr, 0)}
            </span>{' '}
            hr
          </div>
        </div>
      </div>
      {toDelete.length > 0 && (
        <div className="row mt-5 d-grid">
          <button
            className="btn btn-danger my-5"
            onClick={() => handleOnDelete(toDelete)}
          >
            Delete {toDelete.length} tasks
          </button>
        </div>
      )}
    </>
  );
};

export default Table;
