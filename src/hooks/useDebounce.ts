import { useEffect } from "react";

const useDebounce = (func: Function, dependency: any) => {
	useEffect(() => {
		const timer = setTimeout(() => func(), 500);
		return () => clearTimeout(timer)
	},[dependency])
}
export default useDebounce;