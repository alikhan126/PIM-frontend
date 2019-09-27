import { Router } from '@angular/router';
// import { AgGridViewiconComponent } from '../components/base/ag-grid-viewicon/ag-grid-viewicon.component';
const ACTIONS_TEMPLATE = `
    <div class="dealer-actions">
        <span class="dropdown">
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                                        <i class="icon-More"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="#">Submenu 1-1</a>
                                        </li>
                                        <li>
                                            <a href="#">Submenu 1-2</a>
                                        </li>
                                        <li>
                                            <a href="#">Submenu 1-3</a>
                                        </li>
                                    </ul>
                                </span>
                                <a (onclick)="Router.navigate('/dealers');">
                                    <i class="icon-view" (click)="onclick()"></i>
                                </a>
                                <a href="javascript:void(0)" [routerLink]="['/dealers']">
                                    <i class="icon-edit0"></i>
                                </a>
                                <a href="javascript:void(0)" [routerLink]="['/dealers']">
                                    <i class="icon-delete"></i>
                                </a>
    </div>`;    
const Status_TEMPLATE = `
    <div class="dealer-status">
        <i class="icon-Complete-Done"></i>
        <i class="icon-In-Progress-Default"></i>
    </div>`;

    
export class MockData {
    onclick() {
        alert('Working');
        console.log("View");
    }
    static agGridColumnDefs_Farmers: any[] = [
        { headerName: ' ',  field: '', width: 60, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: 'Farmer', field: 'farmerName', width: 100, sortable: true},
        { headerName: 'CNIC #', field: 'cnic', width: 100, },
        { headerName: 'Father / HusbandName', field: 'fatherHusbandName', width: 200, },
        { headerName: 'Date of Birth',  field: 'dateOfBirth', width: 100, },
        { headerName: 'Phone #', field: 'cellPhone', width: 100, },      
        { headerName: 'Farmer Status', field: 'farmerStatus.farmerStatueName', width: 150, },
       { headerName: 'Area (Acres)',  field: 'unionCouncil', width: 100, },
        { headerName: 'Status', field: 'activeStatus', width: 100, template: Status_TEMPLATE },
        { headerName: 'Action', field: '', width: 150, cellRenderer: 'AgGridActionsRenderer' }
    ];
    static agGridColumnDefs_Tickets: any[] = [
        { headerName: ' ',  field: '', width: 60, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: 'Ticket ID',  field: 'data.ticketId', width: 100, sortable: true},
        { headerName: 'Ticket Type', field: 'data.ticketType.ticketTypeName', width: 170, },
            { headerName: 'Created Date', field: 'data.createdDate', width: 170, },
            { headerName: 'Resolve Date', field: 'data.resolvedDate', width: 170, },
            { headerName: 'SLA Status', field: 'data.slastatus', width: 100, },
            { headerName: 'Created By', field: 'CreatedByName', width: 100, },
            { headerName: 'Status', field: 'data.activeStatus', width: 100, cellRenderer: 'AgStatusActionsRenderer' },
            { headerName: 'Action', field: '', width: 120, cellRenderer: 'AgGridActionsRenderer' },
            { headerName: 'Assign', field: '', width: 120, cellRenderer: 'AgGridAdditionalActionsRenderer' }
    ];

    static agGridColumnDefs_FarmerTickets: any[] = [
        { headerName: ' ',  field: '', width: 60, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: 'Ticket ID',  field: 'data.ticketId', width: 100, sortable: true},
        { headerName: 'Ticket Type', field: 'data.ticketType.ticketTypeName', width: 200, },
        { headerName: 'Created By', field: 'CreatedByName', width: 100, },
        { headerName: 'Due Date', field: 'data.dueDate', width: 200, },
        { headerName: 'Resolve Date', field: 'data.resolvedDate', width: 150, },
        { headerName: 'Ticket Source', field: 'TicketSource', width: 100, },
        { headerName: 'SLA Status', field: 'data.slastatus', width: 100, },
        { headerName: 'Ticket Status', field: 'data.status.statusName', width: 100, },
        
    ];

     static agGridColumnDefs_News: any[] = [
        { headerName: ' ',  field: '', width: 60, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: 'District',  field: 'districtCodeNavigation.districtName', width: 100, sortable: true},
        { headerName: 'News Title', field: 'header', width: 200, },
        { headerName: 'Source', field: 'url', width: 300, },
        { headerName: 'Modified', field: 'modifiedDateTime', width: 200, },
        { headerName: 'Status', field: 'activeStatus', width: 100, },
        { headerName: 'Modified By', field: 'modifiedBy', width: 100, },
         { headerName: 'Action', field: '', width: 150, cellRenderer: 'AgGridActionsRenderer' }
        
    ];

      static agGridRowDefs_News: any[] = [
        {
            Region: 'Lahore',
            NewsTitle: 'Urea off-take expected to increase',
            Source: 'Pakissan.com',
            Modified: '02-Feb-2019',
            Status: 'Published',
            ModifiedBy: 'Usman Saeed'

        },
        {
            Region: 'Lahore',
            NewsTitle: 'Urea off-take expected to increase',
            Source: 'Pakissan.com',
            Modified: '05-Feb-2019',
            Status: 'In-review',
            ModifiedBy: 'Usman Saeed'

        },
      ];

    static agGridRowDefs_Farmers: any[] = [
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
        {
            Name: 'Shahbaz Ali',
            CNIC: '3502-56789-120',
            FatherHusbandName: 'Niamat Ali',
            DateofBirth: '05 Oct, 2018',
            Phone: '35202-1234567-8',
            FarmStatus: 'Owner',
            AreaAcres: '125',
            FarmerFriend: 'Muhammad Arshad',
            FriendNumber: '0343-12345678'
        },
    ];

    static agGridColumnDefs_EdaTower: any[] = [
        { headerName: ' ',  field: '', width: 60, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: 'Dealer',  field: 'dealerNameUrdu', width: 100, },
        { headerName: 'Address', field: 'address', width: 200, },
        { headerName: 'Phone #', field: 'cellPhone', width: 100, },
        { headerName: 'CNIC #', field: 'cnic', width: 120, },
        { headerName: 'Dealer Status',  field: 'dealerStatus', width: 120, },
        { headerName: 'District',  field: 'districtCodeNavigation.districtNameUrdu', width: 100, },
        { headerName: 'Tehsil', field: 'tehsilCodeNavigation.tehsilNameUrdu', width: 100, },
        { headerName: 'Status', field: 'activeStatus', width: 100, template: Status_TEMPLATE },
        { headerName: 'Action', field: '', width: 150, cellRenderer: 'AgGridActionsRenderer' }
    ];

    static agGridRowData_EdaTower: any[] = [
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        },
        {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        }, {
            Dealer_Status: '6/13/2017',
            Address: '50 Main Gulberg Multan',
            District: 'Multan',
            Tehsil: 'Tehsil A',
            CNIC: '35202-1234567-8',
            Cell: '0300-1324567',
            Dealer: 'Abdul Malik'
        }
    ];

    static agGridColumnDefs_homeScreen: any[] = [
        {
            headerName: 'Actions',
            field: 'actions',
            width: 80
        },
        {
            headerName: 'Latest BX Status',
            field: 'latestBXStatus',
            width: 80
        },
        {
            headerName: 'LOB',
            field: 'lob',
            width: 80
        },
        {
            headerName: 'Underwriter',
            field: 'underwriter',
            width: 80
        },
        {
            headerName: 'Ceding Group',
            field: 'cedingGroup',
            width: 80
        },
        {
            headerName: 'Ceding Company',
            field: 'cedingCompany',
            width: 80
        },
        {
            headerName: 'Latest As At Date',
            field: 'latestAsAtDate',
            width: 80
        },
        {
            headerName: 'Latest BX Policy Eff. Date',
            field: 'latestBxPolicyEffDate',
            width: 80
        },
        {
            headerName: 'Latest Policy Eff. Date In Eda',
            field: 'latestPolicyEffDateInEda',
            width: 80
        },
        {
            headerName: 'Treaty Status',
            field: 'treatyStatus',
            width: 80
        },
        {
            headerName: 'Submissions',
            field: 'submissions',
            width: 80
        },
        {
            headerName: 'BX Type',
            field: 'bxType',
            width: 80
        },
        {
            headerName: 'BX Frequency',
            field: 'bxFrequency',
            width: 80
        }
    ];

    static agGridRowDefs_homeScreen: any[] = [
        {
            actions: '',
            latestBXStatus: 'Validation',
            lob: 'Headge Fund',
            underwriter: 'Karl',
            cedingGroup: 'Microsoft Ltd',
            cedingCompany: 'Microsoft Ltd',
            latestAsAtDate: '8/2/2017',
            latestBxPolicyEffDate: '8/2/2017',
            latestPolicyEffDateInEda: '8/2/2017',
            treatyStatus: 'Reserve',
            submissions: '10',
            bxType: 'new',
            bxFrequency: '5'
        },
        {
            actions: '',
            latestBXStatus: 'Validation',
            lob: 'Headge Fund',
            underwriter: 'Karl',
            cedingGroup: 'Microsoft Ltd',
            cedingCompany: 'Microsoft Ltd',
            latestAsAtDate: '8/2/2017',
            latestBxPolicyEffDate: '8/2/2017',
            latestPolicyEffDateInEda: '8/2/2017',
            treatyStatus: 'Reserve',
            submissions: '10',
            bxType: 'new',
            bxFrequency: '5'
        },
        {
            actions: '',
            latestBXStatus: 'Validation',
            lob: 'Headge Fund',
            underwriter: 'Karl',
            cedingGroup: 'Microsoft Ltd',
            cedingCompany: 'Microsoft Ltd',
            latestAsAtDate: '8/2/2017',
            latestBxPolicyEffDate: '8/2/2017',
            latestPolicyEffDateInEda: '8/2/2017',
            treatyStatus: 'Reserve',
            submissions: '10',
            bxType: 'new',
            bxFrequency: '5'
        }
    ];

    static agGridColumnDefs_NameMatching: any[] = [
        {
            headerName: 'Action',
            field: 'Action',
            width: 85,
            checkboxSelection: true
        },
        {
            headerName: 'BXENtityName',
            field: 'BXENtityName',
            width: 80
        },
        {
            headerName: 'MatchPercentage',
            field: 'MatchPercentage',
            width: 200
        },
        {
            headerName: 'MatchedName',
            field: 'MatchedName',
            width: 100
        },
        {
            headerName: 'More',
            field: 'More',
            width: 100
        },
        {
            headerName: 'CedentPolicyLimit',
            field: 'CedentPolicyLimit',
            width: 150
        },
        {
            headerName: 'PolicyGWP',
            field: 'PolicyGWP',
            width: 150
        },
        {
            headerName: 'AttachmentPoint',
            field: 'AttachmentPoint',
            width: 100
        },
        {
            headerName: 'MatchSource',
            field: 'MatchSource',
            width: 100
        }
    ];

    static agGridRowData_NameMatching: any[] = [
        {
            Action: '',
            BXENtityName: 'Microsoft',
            MatchPercentage: '100',
            MatchedName: 'Microsoft',
            More: '...',
            CedentPolicyLimit: '10000000',
            PolicyGWP: '10000',
            AttachmentPoint: '90000000',
            MatchSource: 'Raw Nmes'
        },
        {
            Action: '',
            BXENtityName: 'Microsoft',
            MatchPercentage: '100',
            MatchedName: 'Microsoft',
            More: '...',
            CedentPolicyLimit: '10000000',
            PolicyGWP: '10000',
            AttachmentPoint: '90000000',
            MatchSource: 'Raw Nmes'
        },
        {
            Action: '',
            BXENtityName: 'Microsoft',
            MatchPercentage: '100',
            MatchedName: 'Microsoft',
            More: '...',
            CedentPolicyLimit: '10000000',
            PolicyGWP: '10000',
            AttachmentPoint: '90000000',
            MatchSource: 'Raw Nmes'
        },
        {
            Action: '',
            BXENtityName: 'Microsoft',
            MatchPercentage: '100',
            MatchedName: 'Microsoft',
            More: '...',
            CedentPolicyLimit: '10000000',
            PolicyGWP: '10000',
            AttachmentPoint: '90000000',
            MatchSource: 'Raw Nmes'
        }
    ];

    static agGridColumnDefs_WF: any[] = [
        { field: 'Action', cellRenderer: 'BordereauActionsRenderer' },
        { field: 'ProcessStatus' },
        { field: 'LOB' },
        { field: 'Underwriter' },
        { field: 'CedingGroup' },
        { field: 'CedingCompany' },
        { field: 'AsAtDate' },
        { field: 'FileType' },
        { field: 'FileName' },
        { field: 'SheetName' },
        { field: 'Comments' },
        { field: 'LastUpdateDate' },
        { field: 'LastUpdatedBy' },
        { field: 'LoadDate' },
        { field: 'LoadBy' }
    ];

    static agGridRowData_WF: any[] = [
        {
            ProcessStatus: 'Completed',
            LOB: 'Prof. Liab(Cyber)',
            Underwriter: 'Markowski, Lauren',
            CedingGroup: 'Travelers Comapnies Inc.',
            CedingCompany: 'Travelers Indemnity Company.',
            AsAtDate: '4/20/2018',
            FileType: 'Final',
            FileName: 'Travelers Cyber',
            SheetName: 'Sheet1',
            Comments: 'File Comments',
            LastUpdateDate: '4/20/2018',
            LastUpdatedBy: '4/20/2018',
            LoadDate: '4/20/2018',
            LoadBy: 'sfuller'
        }
    ];


}
