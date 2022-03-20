import { createAction } from '@ngrx/store';
import { Section } from "src/app/ngrx/models/section.model";

export const LOAD_SECTIONS = '[Section] Load Sections';
export const ADD_SECTION = '[Section] Add Section';
export const REMOVE_SECTION = '[Section] Remove Section';

export const addSection = createAction(
  ADD_SECTION,
  (section: Section) => ({section})
);

export const loadSections = createAction(LOAD_SECTIONS);
