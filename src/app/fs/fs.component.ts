import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { NodeService } from './fs.service';
import { MessageService, TreeNode, TreeTableNode } from 'primeng/api';
//import { TreeTableModule } from 'primeng/treetable';
//import { TreeNode } from 'primeng/primeng';

interface Column {
  field: string;
  header: string;
}

interface NodeEvent {
  originalEvent: Event;
  node: TreeNode;
}

@Component({
  selector: 'app-fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.css'],
  providers: [NodeService,MessageService]
})


export class FsComponent implements OnInit {
  files: TreeNode<any>[] =[];
  selectedNodes: TreeNode<any>[] = [];
  // files: TreeTableNode[] =[];
  // selectedNodes: TreeTableNode[] =[];
  // selectedNodes!: TreeTableNode[];
  // files!: TreeTableNode[];

  onSelectionChange(event: TreeNode<any> | TreeNode<any>[] | null) {
    if (Array.isArray(event)) {
      this.selectedNodes = event;
     // this.selectedNodes = event.filter(node => node.selectionMode === 'checkbox');
    } else if (event) {
      this.selectedNodes = [event];
    } else {
      this.selectedNodes = [];
    }
  }

  selectionKeys = {};

  cols!: Column[];

  constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
      this.nodeService.getTreeTableNodes().then((files) => {
          this.files = files;
          this.cd.markForCheck();
      });

      this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'size', header: 'Size' },
          { field: 'type', header: 'Type' }
      ];
  }


  // metaKeySelection: boolean = true;
  // selectedNodes!: TreeNode[];
  // selectedNode!: TreeNode;
  // files!: TreeNode[];
  // selectionKeys = {};
  // cols!: Column[];
  // constructor(private nodeService: NodeService, private messageService: MessageService) { }
  // ngOnInit() {
  //   this.nodeService.getFilesystem().then((files) => (this.files = files));

  //   this.cols = [
  //     { field: 'name', header: 'Name' },
  //     { field: 'size', header: 'Size' },
  //     { field: 'type', header: 'Type' }
  //   ];
  //   this.selectionKeys = {
  //     '0-0': {
  //       partialChecked: false,
  //       checked: true
  //     }
  //   };
  // }


   //   ngOnInit() {
  //     this.nodeService.getTreeTableNodes().then((files) => (this.files = files));

  //     this.cols = [
  //         { field: 'name', header: 'Name' },
  //         { field: 'size', header: 'Size' },
  //         { field: 'type', header: 'Type' }
  //     ];

  //     this.selectionKeys = {
  //         '0-0': {
  //             partialChecked: false,
  //             checked: true
  //         }
  //     };
  // }

//   nodeSelect(event: NodeEvent) {
//     this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
// }

// nodeUnselect(event: NodeEvent) {
//     this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.name });
// }
}
