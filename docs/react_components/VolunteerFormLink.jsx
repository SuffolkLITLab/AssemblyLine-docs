import { useLocation } from '@docusaurus/router';


export function VolunteerFormLink( props ) {
  /**
   * Send the current url args when the user presses the link to the volunteer
   * form to help us track how people found the program.
   * */

  const { search } = useLocation();
  const urlParams = new URLSearchParams( search );
  const source = props.source || urlParams.get(`source`);

  let sign_up_text = `Sign up to express your interest`
  if ( source ) {
    sign_up_text = `Sign up to volunteer`
  }

  return (
    <p>
      <a
        className={`button button--primary ${ props.className }`}
        target="_blank"
        // disabled={ props.disabled }
        style={{
          "--ifm-button-size-multiplier": "1.25",
          fontWeight: "normal",
          textDecoration: "none"
        }}
        href={
          `https://apps.suffolklitlab.org/interview?i=docassemble.DALVolunteerSignup:main.yml&source=${ source || 'docs' }`
        }
      >
        { sign_up_text }
      </a>
    </p>
  )

};
