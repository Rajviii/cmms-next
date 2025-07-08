import CardComponent from "@/components/dummy/CardComponent";
import CustomBreadcrumb from "@/components/dummy/CustomBreadcrum";
import CustomCalendar from "@/components/dummy/CustomCalendar";
import CustomDataTools from "@/components/dummy/CustomDataTools";
import CustomDialog from "@/components/dummy/CustomDialog";
import CustomDropdowns from "@/components/dummy/CustomDropdowns";
import CustomLabels from "@/components/dummy/CustomLabels";
import CustomListBox from "@/components/dummy/CustomListBox";
import CustomNotification from "@/components/dummy/CustomNotification";
import InputFields from "@/components/dummy/InputFields";       
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { paletteIcon } from '@progress/kendo-svg-icons';

export default function KendoUI() {
    const columns = [
        { key: 'woNumber', label: 'WO #' },
        { key: 'client', label: 'Client' },
        { key: 'locName', label: 'Loc Name' },
        { key: 'locNumber', label: 'Loc #' },
        { key: 'status', label: 'Status' },
        { key: 'division', label: 'Division' },
        { key: 'category', label: 'Category' },
        { key: 'orderType', label: 'Order Type' },
        { key: 'priority', label: 'Priority' },
        { key: 'manager', label: 'Manager' },
        { key: 'dne', label: 'DNE' },
        { key: 'caller', label: 'Caller' },
        { key: 'clientPO', label: 'Client PO #' },
        { key: 'invoiceNumber', label: 'Invoice #' },
        { key: 'vendor', label: 'Vendor' },
        { key: 'onsiteDate', label: 'Onsite Date' },
        { key: 'cityState', label: 'City/State' },
        { key: 'slt', label: 'SLT' },
        { key: 'followUpUser', label: 'Follow-Up User' },
        { key: 'followUpDate', label: 'Follow-Up Date' },
        { key: 'inputDate', label: 'Input Date' },
        { key: 'actRef', label: 'Act Ref' },
    ];

    const workOrders = [
        {
            woNumber: 'WO-001',
            client: 'ABC Corp',
            locName: 'Main Office',
            locNumber: 'LOC-123',
            status: 'Open',
            division: 'North',
            category: 'Electrical',
            orderType: 'Urgent',
            priority: 'High',
            manager: 'John Doe',
            dne: 'Internal Ref',
            caller: 'Jane Smith',
            clientPO: 'PO-456',
            invoiceNumber: 'INV-789',
            vendor: 'Vendor Inc',
            onsiteDate: '2025-07-10',
            cityState: 'New York, NY',
            slt: 'SLT-001',
            followUpUser: 'Sam Patel',
            followUpDate: '2025-07-15',
            inputDate: '2025-07-01',
            actRef: 'ACT-REF-22'
        }
    ];

    return (
        <>
            <div className="flex flex-wrap gap-2">
                <Button themeColor="primary" className="mb-4">Kendo UI Button</Button>
                <SvgIcon icon={paletteIcon} size="xlarge" themeColor="primary" />
            </div>

            <CustomNotification />
            
            {/* Using TailwindCss */}
            {/* <div className="p-4 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4">Work Orders</h2>
                <table className="min-w-[1200px] table-auto border border-gray-300 rounded-md shadow-sm text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} className="px-3 py-2 border">{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {workOrders.map((wo, idx) => (
                            <tr key={idx} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                {columns.map(col => (
                                    <td key={col.key} className="px-3 py-2 border">{wo[col.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

            {/* Not Paid */}
            {/* <CustomDialog /> */}
            {/* <CustomListBox /> */}
            {/* <CustomLabels /> */}
            {/* <CustomBreadcrumb /> */}
            {/* <CardComponent /> */}

            {/* Partially Paid */}
            {/* <InputFields /> */}
            {/* <CustomDropdowns /> */}

            {/* Paid */}
            {/* <CustomCalendar /> */}
            {/* <CustomDataTools /> */}
        </>
    );
}
