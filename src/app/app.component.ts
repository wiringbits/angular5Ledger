import 'babel-polyfill';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import Btc from '@ledgerhq/hw-app-btc';

const getDevice = async () => {
  const transport = await TransportU2F.create();
  const ledger = new Btc(transport);

  ledger.close = () => transport.close();

  return ledger;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  constructor(private translate: TranslateService, @Inject('state') private state) {
    this.tryLedger();

  }

  private async tryLedger() {
    const x = await getDevice();

    console.log(x);
  }
}
