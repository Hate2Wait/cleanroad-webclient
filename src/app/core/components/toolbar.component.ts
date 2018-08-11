import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VALID_THEMES_DESC } from '@cleanroad/core/core.constants';
import { IdentityUser } from '@cleanroad/core/models';


@Component({
    selector: 'cleanroad-toolbar',
    templateUrl: 'toolbar.component.html'
})

export class ToolbarComponent {
    @Output() requestThemeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() requestLogout: EventEmitter<void> = new EventEmitter<void>();
    @Output() linkedMenuClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() hamburgerMenuClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() title = '';
    @Input() sidenavVisible: boolean;
    @Input() user: IdentityUser;

    public themes = VALID_THEMES_DESC;

    public getUserGreeting(): string {
        return 'Hello ' + this.user.preferred_username;
    }
}
