import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { PortalService } from '../shared/portal.service';
import { TOASTR_TOKEN ,Toastr } from '../shared/toastr.service';


@Component({
    templateUrl: './add-candidate.component.html',
    styles: [`

/* *{background-color: transparent; color: royalblue; ; color: navy } */
 select.custom-select{ background-color:transparent; color: nav}
    button{background-color: royalblue; border: none; color: white}
    #but{width: 240px}
    #but2{width: 240px; background-color: red}
    h2{text-align: center; margin-top: 24px; color: royalblue}
    h5{text-align: center; color: royalblue}
    hr{background-color: darkred}
    input.form-control{background-color: transparent; color: navy}

    /* :host{display:block; background-color: navy} */
    `]
})

export class AddCandidateComponent implements OnInit{
    Submitted = false
    AddCandidate: FormGroup
    Department: any = [
      'Agricultural Economics & Extension', 'Agricultural Economics',   'Agricultural and Environmental Engineering', 'Agricultural Extension and Rural Sociology', 'Anaesthesia and Intensive Care', 'Anatomy and Cell Biology',
      'Animal Science','Archeaology','Architecture',
      'Biochemistry',
      'Botany',
      'Building',
      'Business Law',
      'Chemical Engineering',
      'Chemical Pathology',
      'Chemistry',
      'Civil Engineering',
      'Clinical Pharmacy and Pharmacy Administration',
      'Community Health and Nutrition',
      'Computer Science and Engineering',
      'Continuing Education',
      'Crop production',
      'Demography and Social Statistics',
      'Dermatology and Venerology',
      'Dramatic Arts',
      'Drug Research and Production Unit',
      'Economics',
      'Educational Administration and Planning',
      'Educational Foundation and Counseling',
      'Educational Technology',
      'Electronic and Electrical Engineering',
      'English Language',
      'Environmental Health and Epidemiology',
      'Estate Management',
      'Fine and Applied Arts',
      'Food Nutrition and Consumer Sciences',
      'Food Science and Technology',
      'Foreign Languages',
      'Geography',
      'Geology',
      'Haematology and Immunology',
      'History',
      'Institute of Education',
      'International Law',
      'International Relations',
      'Jurisprudence and Private Law',
      'Linguistics',
'Linguistics and African Languages',
      'Local Government Studies',
      'Management and Accounting',
      'Mathematics',
      'Mechanical Engineering',
      'Medical Microbiology and Parasitology',
      'Medical Rehabilitation',
      'Medicine',
      'Mental Health',
      'Materials Science & Engineering',
      'Microbiology',
      'Medical Pharmacology and Therapeutics',
      'Morbid Anatomy and Forensic Medicine',
      'Music','Nursing',
      'Obstetrics, Gynaecology and Perimatology',
      'Orthopaedic Surgery and Traumatology',
      'Paediatrics and Child Health',
      'Pharmaceutical Chemistry',
      'Pharmaceutics',
      'Pharmacognosy',
      'Pharmacology',
      'Philosophy',
      'Physical and Health Education',
      'Physics',
      'Physiological Sciences',
      'Plant Science',
      'Political Science',
      'Psychology',
      'Public Administration',
      'Public Law',
      'Quantity Surveying',
      'Radiology',
      'Religious Studies',
      'Sociology and Anthropology',
      'Soil Science',
      'Special Education and Curriculum Studies',
      'Surgery',
      'Urban and Regional Planning',
      'Zoology'];
    Level: any = ['Lecuturer I', 'Lecturer II', ' Senior Lecturer I', 'Senior Lecturer II', 'Reader'];
    Faculty: any = ['Faculty of Agriculture','Faculty of Administration','Faculty of Law','Faculty of  Pharmacy','Faculty of Sciences',
    'Faculty of Technology',  'Faculty of Art','Faculty of Social-Sciences','Faculty of Enviromental Design and Management', 'Faculty of  Basic Medical Sciences',
    'Faculty of Clinical Sciences','Faculty of Dentistry', 'Faculty of Education',
];


    get accessor(): FormArray{
        return <FormArray>this.AddCandidate.get('accessor')
    }

    constructor(private fb: FormBuilder, private router: Router,
       private portalService: PortalService,@Inject(TOASTR_TOKEN) private toastr: Toastr){
        this.mainForm();
    }

    ngOnInit(){}
    mainForm(){
        this.AddCandidate = this.fb.group({
            surname: ['', Validators.required],
            other: ['',  Validators.required],
            email: ['',  Validators.required],
            number: ['',  Validators.required],
            fac: ['',  [Validators.required]],
            dep: ['',   Validators.required],
            lev: ['',  Validators.required],
            date: ['', Validators.required],
            accessor: this.fb.array([ this.buildAccessors() ])
        })
    }


    onSubmit(){
        this.Submitted = true;
        if(!this.AddCandidate.valid){
            return false
        }else{
           this.portalService.addCanidate(this.AddCandidate.value).subscribe(data => {
            if(data){
                console.log(data);

            }
            else{
                console.log('Invalid')
            }
        },(error) => {
               console.log(error)
           })
        }
        console.log(this.AddCandidate.value)
        this.router.navigate(['candidate-list']);
        this.toastr.success('Candidate Sucessfully registered')

    }

    buildAccessors(): FormGroup{
        return this.fb.group({
            accessorname:  ['', Validators.required],
            accessoremail:  ['', Validators.required],
            university:  ['', Validators.required],
            status: 'invitationsent'
        })
    }

    changeFaculty(e) {
        this.AddCandidate.get('fac').setValue(e, {
         onlySelf: true
        })
       }
    changeDepartment(e) {
        this.AddCandidate.get('dep').setValue(e, {
         onlySelf: true
        })
       }
     changeLevel(e) {
        this.AddCandidate.get('lev').setValue(e, {
         onlySelf: true
        })
     }

     addAccessors(): void{
        this.accessor.push(this.buildAccessors());
     }

      back(){
          window.alert('are you sure you want to cancel')
          this.router.navigate(['/dashboard'])
      }

}
