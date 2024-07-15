import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { QueryBuilderComponent, RuleChangeEventArgs } from '@syncfusion/ej2-react-querybuilder';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { StockDetails } from '../data';
import {
  GridComponent,
  Page,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  QueryCellInfoEventArgs,
} from '@syncfusion/ej2-react-grids';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export default function Screener() {
  let qbObj = useRef(null);
  let gridObj = useRef(null);
  const [gridData, setGridData] = useState(
    new DataManager({
      url: 'http://localhost:62869/api/StockData',
      adaptor: new UrlAdaptor(),
      // offline: true,
    })
  );
  const [gridQuery, setGridQuery] = useState(
    new Query().where('CompanyName', 'equal', 'Tech Innovators Inc')
  );
  const updateRule = (args: RuleChangeEventArgs) => {
    let predicate = (qbObj.current as any).getPredicate(args.rule);
    if (isNullOrUndefined(predicate)) {
      setGridQuery(new Query());
    } else {
      setGridQuery(new Query().where(predicate));
    }
  };
  const onGridCreated = () => {
    // updateRule({ rule: qbObj.current.getValidRules(qbObj.current.rule) });
  };
  let columnData = [
    {
      field: 'CompanyName',
      label: 'Company',
      type: 'string',
      operators: [
        { key: 'equal', value: 'equal' },
        { key: 'greaterthan', value: 'greaterthan' },
        { key: 'lessthan', value: 'lessthan' },
      ],
    },
    {
      field: 'Last',
      label: 'Last',
      type: 'number',
      operators: [
        { key: 'equal', value: 'equal' },
        { key: 'greaterthan', value: 'greaterthan' },
        { key: 'lessthan', value: 'lessthan' },
      ],
    },
    {
      field: 'High',
      label: 'High',
      type: 'number',
      operators: [
        { key: 'equal', value: 'equal' },
        { key: 'greaterthan', value: 'greaterthan' },
        { key: 'lessthan', value: 'lessthan' },
      ],
    },
    {
      field: 'ChangeInValue',
      label: 'Change In Value',
      type: 'number',
      operators: [
        { key: 'equal', value: 'equal' },
        { key: 'greaterthan', value: 'greaterthan' },
        { key: 'lessthan', value: 'lessthan' },
      ],
    },
    { field: 'Rating', label: 'Rating', type: 'string' },
  ];
  let importRules = {
    condition: 'or',
    rules: [
      {
        label: 'Company',
        field: 'CompanyName',
        type: 'string',
        operator: 'equal',
        value: 'Tech Innovators Inc',
      },
    ],
  };
  const queryCellInfo = (args: QueryCellInfoEventArgs) => {
    if (args.column!.field === 'Rating') {
      let iconEle = args.cell!.querySelector('.e-icons');
      if ((args.data as StockDetails).ChangeInValue > 5) {
        iconEle!.classList.add('e-chevron-up-double');
      } else if ((args.data as StockDetails).ChangeInValue > 0) {
        iconEle!.classList.add('e-chevron-up');
      } else if ((args.data as StockDetails).ChangeInValue > -5) {
        iconEle!.classList.add('e-chevron-down');
      } else {
        iconEle!.classList.add('e-chevron-down-double');
      }
    }
    if (
      args.column!.field === 'Last' ||
      args.column!.field === 'ChangeInValue' ||
      args.column!.field === 'ChangeInPercent' ||
      args.column!.field === 'Rating'
    ) {
      if ((args.data as StockDetails).ChangeInValue > 0) {
        args.cell!.classList.add('e-pos');
      } else {
        args.cell!.classList.add('e-neg');
      }
    }
  };
  return (
    <div className="control-pane">
      <div className="control-section qb-section">
        <div className="row">
          <div className="col-lg-12 control-section qb-section" id="qb-section">
            <QueryBuilderComponent
              width="100%"
              dataSource={[]}
              columns={columnData}
              rule={importRules}
              ruleChange={updateRule}
              ref={qbObj}
            ></QueryBuilderComponent>
          </div>
          <div className="col-lg-12 control-section qb-section">
            <div className="content-wrapper">
              <GridComponent
                allowPaging={true}
                dataSource={gridData}
                query={gridQuery}
                created={onGridCreated}
                queryCellInfo={queryCellInfo}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="ID"
                    visible={false}
                    textAlign="Right"
                    width="100"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="CompanyName"
                    headerText="Company"
                    width="170"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Sector"
                    visible={false}
                    width="100"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Net"
                    visible={false}
                    format="N2"
                    textAlign="Right"
                    width="100"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Last"
                    format="N2"
                    textAlign="Right"
                    width="70"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="ChangeInValue"
                    headerText="CHNG 1D"
                    format="N2"
                    textAlign="Right"
                    width="100"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="ChangeInPercent"
                    headerText="CHNG(%) 1D"
                    format="P2"
                    textAlign="Center"
                    width="100"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Rating"
                    template={"<span class='e-icons'></span><span class='rating'> ${Rating} </span >"}
                    width="120"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="High"
                    format="N2"
                    textAlign="Right"
                    width="70"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Low"
                    format="N2"
                    textAlign="Right"
                    width="70"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Volume"
                    textAlign="Right"
                    width="90"
                  ></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Page]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
