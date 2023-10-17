import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../create-facility/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  prompt = '';
  response: any[] = []
  loading = false;

  constructor(
    public http: HttpClient,
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.http.delete('https://general-runtime.voiceflow.com/state/user/TEST_USER', {
      headers: {
        Authorization: "VF.DM.652ecc210267ec00078fc726.ZFPdEwvU0d1jiIMQ"
      }
    }).subscribe(res => {
      this.loading = false;
      this.doPrompt('', { action: { type: 'launch' } });
    })
  }

  sendPrompt(body: any) {
    this.doPrompt(this.prompt, body ? { request: body } : {
      "request": {
        "type": "text",
        "payload": this.prompt
      }
    })
  }

  doPrompt(p: string, body: any) {
    this.loading = true;
    this.http.post('https://general-runtime.voiceflow.com/state/user/TEST_USER/interact?logs=off', body ?? {
      prompt: p,
      request: {
        type: 'text',
        payload: {
          text: p
        }
      }
    }, {
      headers: {
        Authorization: "VF.DM.652ecc210267ec00078fc726.ZFPdEwvU0d1jiIMQ"
      }
    }).subscribe((res: any) => {
      this.loading = false;
      this.prompt = '';
      this.response.push(res);
      const reportJSON = res.find((r: any) => r?.type === 'text')?.payload?.message;
      const parsed = this.parseJsonIfJson(reportJSON);
      console.log(parsed)
      if (parsed && parsed.event_name && parsed.event_args) {
        console.log('redirect to report name')
        this.doAction(parsed);
        // const redirect  = confirm('Shall i redirect to report name ')
      }
    })
  }

  parseJsonIfJson(str: string) {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  getButtons(obj: any[]) {
    const choice = obj.find(o => o.type === 'choice');
    return choice ? choice?.payload.buttons : [];
  }

  doAction(action: any) {
    switch (action.event_name) {
      case "run-report": {
        const redirect = confirm(`Shall i redirect to report name: ${action.event_args} `);
        if (redirect) {
          window.location.href = `https://google.com/search?q=${action.event_args}`;
        }
      }
      break
      case "create-instrument": {
        this.data.facData = action.event_args;
        this.router.navigate(['/create-facility']);
      }
    }
  }

  getMessages(item: any) {
    return item?.type === 'text' ? item?.payload?.message : ''
  }
}