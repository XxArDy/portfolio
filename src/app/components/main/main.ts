import { Component } from '@angular/core';
import { Hero } from './components/hero/hero'
import { About } from "./components/about/about";
import { Skills } from "./components/skills/skills";
import { Projects } from "./components/projects/projects";
import { Experience } from "./components/experience/experience";

@Component({
  selector: 'app-main',
  imports: [Hero, About, Skills, Projects, Experience],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
