import { Component, inject, OnInit } from '@angular/core';
import { Faq } from '../../interfaces/faq.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-accordian',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordian.component.html',
  styleUrl: './accordian.component.scss',
})
export class AccordianComponent implements OnInit {
  protected auth = inject(AuthService);

  // --------------------------------------------------FAQ Details--------------------------------------------------
  faqs: Faq[] = [
    {
      question: 'Architecto, minus magnam?',
      answer:
        'Aut delectus consectetur nostrum id error eius maiores, sit nisi mollitia magni alias dolore voluptate quo aperiam. Consequatur sunt sint tenetur blanditiis et, animi quibusdam dolores necessitatibus maiores cupiditate delectus quo itaque velit facilis officia impedit architecto. Sapiente, in.',
    },
    {
      question: 'Esse tempore exercitationem magni?',
      answer:
        'Eius ducimus impedit nemo a, laboriosam nobis error atque, adipisci commodi placeat vel tempore odit excepturi totam inventore debitis at molestias dolores. Tempora corporis deleniti rerum illo ipsa iure ullam ratione minima obcaecati excepturi. Consequatur, minima nam. Incidunt aperiam tempore est similique reprehenderit molestiae.',
    },
    {
      question: 'Expedita eos maiores vitae eius?',
      answer:
        'Iusto temporibus fugiat, asperiores odit sapiente alias doloribus eos libero provident obcaecati amet distinctio vel rem pariatur. Non fugit illo accusamus cum adipisci. Praesentium dolores quod voluptates, magnam animi facere natus quidem dolore totam nulla iure cumque, perferendis doloribus.',
    },
    {
      question: 'Quibusdam, ducimus explicabo?',
      answer:
        'Quaerat quod similique, velit esse fuga aut minima enim dolorem nisi explicabo modi expedita quos quo recusandae doloribus inventore, tenetur consectetur repellendus. Quibusdam officia soluta perferendis in consequatur eligendi totam, harum vel odio sit quia nihil voluptates inventore, praesentium veritatis consectetur, libero quaerat eum.',
    },
    {
      question: 'Distinctio quaerat quo nostrum?',
      answer:
        'Cupiditate dolor nemo sed aut neque eaque velit veritatis exercitationem praesentium, dolorum enim accusamus est, officiis quam. Facere rerum repellat ut commodi impedit at eius in expedita, deserunt repudiandae, veniam perferendis tempore quasi! Error ullam amet inventore aspernatur animi.',
    },
    {
      question: 'Dicta earum quos quasi consequuntur?',
      answer:
        'Modi totam consequuntur animi fuga assumenda quasi vel error soluta iusto quia, quidem vero voluptatibus recusandae sequi deserunt sapiente a ipsum adipisci. Rem pariatur eos aut molestiae aliquid tempore ipsam perferendis odit veniam modi alias officiis quam nemo, animi ullam, cum necessitatibus, repellendus exercitationem.',
    },
  ];
  // --------------------------------------------------End FAQ Details--------------------------------------------------

  // --------------------------------------------------Accordian--------------------------------------------------
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      const questionList: NodeListOf<Element> =
        document.querySelectorAll('.question');
      const answerList: NodeListOf<Element> =
        document.querySelectorAll('.answer');
      const accordianIconList: NodeListOf<Element> =
        document.querySelectorAll('.accordian-icon');
      questionList.forEach((ques: Element, i: number) => {
        ques.addEventListener('click', () => {
          // console.log(`Question at index ${i} is clicked`);
          answerList.forEach((answer: Element, j: number) => {
            if (i !== j) answer.classList.add('hidden');
            else answer.classList.toggle('hidden');
          });
          accordianIconList.forEach((accordianIcon: Element, j: number) => {
            if (i !== j) accordianIcon.classList.remove('rotate-45');
            else accordianIcon.classList.toggle('rotate-45');
          });
        });
      });
    } else
      console.warn('Not running in the browser, Document is not available');
  }
  // --------------------------------------------------End Accordian--------------------------------------------------
}
