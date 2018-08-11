import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cleanroad-sidenav-content',
    templateUrl: 'sidenav-content.component.html',
    styleUrls: [
        'sidenav-content.component.scss'
    ]
})

export class SidenavContentComponent {
    @Output() linkClicked = new EventEmitter();

    public adminLinks: any[] = [];
}
